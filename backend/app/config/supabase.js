// config/supabase.js
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase, supabaseUrl };
