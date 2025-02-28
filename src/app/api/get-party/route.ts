// app/api/get-party/route.ts

import { neon } from "@neondatabase/serverless";
import { NextResponse } from 'next/server';


const sql = neon(process.env.DATABASE_URL);

/*
export async function GET() {
  const data = await sql`SELECT CODE FROM parties`;
  return NextResponse.json({ data });
} */

