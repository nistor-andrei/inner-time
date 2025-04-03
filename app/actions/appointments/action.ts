import { Appointments, Response } from "@/utils/namespace";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

export const getAppointments = async (
  userId: string
): Promise<Response<Appointments[], PostgrestError | null>> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("therapist_id", userId);

  return { data: data ?? [], error };
};
