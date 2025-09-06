
import { Pool } from 'pg'
import crypto from 'crypto'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const installers = { win:process.env.INSTALLER_WIN, mac:process.env.INSTALLER_MAC, linux:process.env.INSTALLER_LINUX }
function genKey(){ const raw = crypto.randomBytes(16).toString('base64url').toUpperCase().replace(/[^A-Z0-9]/g,''); const k=raw.slice(0,20); return `${k.slice(0,5)}-${k.slice(5,10)}-${k.slice(10,15)}-${k.slice(15,20)}` }
export default async function handler(req,res){ if(req.method!=='POST') return res.status(405).end(); const {os,plan='standard',ref}=req.body||{}; if(!installers[os]) return res.status(400).json({error:'Unsupported OS'}); const key=genKey(); await pool.query('insert into licenses(license_key, plan, max_devices) values ($1,$2,$3)',[key,plan,3]); return res.json({ installer_url: installers[os], license_key: key }); }
