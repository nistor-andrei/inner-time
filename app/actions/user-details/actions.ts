import { UserDetails } from "@/utils/namespace";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

interface UserDetailsResponse {
  data: UserDetails;
  error: PostgrestError | null;
}

export const getUserDetails = async (
  userId: string
): Promise<UserDetailsResponse> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_details")
    .select("*")
    .eq("user_id", userId)
    .single();
  return { data, error };
};
