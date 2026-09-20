import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Users, TrendingUp } from "lucide-react";
import { AppointmentList } from "@/components/dashboard/AppointmentList";
import { PublicProfileCard } from "@/components/dashboard/PublicProfileCard";
import {
  addDaysToDateKey,
  formatAppointmentDate,
  getDateKeyInTimeZone,
  zonedDateTimeToIso,
} from "@/lib/utils/datetime";

async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      appointments: [],
      publicProfileSlug: null,
      stats: { today: 0, next: "--:--" },
    };
  }

  const todayKey = getDateKeyInTimeZone(new Date());
  const todayStart = zonedDateTimeToIso(todayKey, "00:00:00");
  const tomorrowStart = zonedDateTimeToIso(addDaysToDateKey(todayKey, 1), "00:00:00");

  const [appointmentsResult, todayResult, professionalResult] = await Promise.all([
    supabase
      .from("appointments")
      .select(`
        id,
        start_time,
        end_time,
        status,
        clients (
          name,
          email
        )
      `)
      .eq("professional_id", user.id)
      .gte("start_time", new Date().toISOString())
      .neq("status", "cancelled")
      .order("start_time", { ascending: true }),
    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("professional_id", user.id)
      .gte("start_time", todayStart)
      .lt("start_time", tomorrowStart)
      .neq("status", "cancelled"),
    supabase
      .from("professionals")
      .select("slug")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  const appointments = appointmentsResult.data;
  const publicProfileSlug = professionalResult.data?.slug ?? null;

  return {
    appointments: appointments || [],
    publicProfileSlug,
    stats: {
      today: todayResult.count ?? 0,
      next: appointments?.[0]
        ? formatAppointmentDate(appointments[0].start_time, {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          })
        : "--:--",
    }
  };
}

export default async function DashboardPage() {
  const { appointments, publicProfileSlug, stats } = await getDashboardData();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido a tu panel de control.</p>
      </div>

      <PublicProfileCard slug={publicProfileSlug} />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
            <p className="text-xs text-muted-foreground">Programadas para hoy</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.next}</div>
            <p className="text-xs text-muted-foreground">Horario del siguiente turno</p>
          </CardContent>
        </Card>

        {/* Placeholders for future metrics */}
        <Card className="shadow-sm opacity-60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">En desarrollo</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm opacity-60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">En desarrollo</p>
          </CardContent>
        </Card>
      </div>

      {/* Main List */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Próximas Citas</CardTitle>
            <CardDescription>
              Gestiona tus turnos confirmados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentList initialAppointments={appointments} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
