import { Response, UserDetails } from "@/utils/namespace";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export const getUserDetails = async (
  userId: string
): Promise<Response<UserDetails, PostgrestError | null>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_details")
    .select("*")
    .eq("therapist_id", userId)
    .single();
  return { data, error };
};
