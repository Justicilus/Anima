import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zawbsrsclngdbqxypwap.supabase.co";
const supabaseAnonKey = "sb_publishable_obaeAB3DcWUb96mkVnjEqQ_x8tPxXUs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
