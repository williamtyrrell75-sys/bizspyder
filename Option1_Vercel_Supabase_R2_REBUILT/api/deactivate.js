
import { Pool } from 'pg'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export default async function handler(req,res){ if(req.method!=='POST') return res.status(405).end(); const { key, device_hash } = req.body||{}; const L=await pool.query('select id from licenses where license_key=$1',[key]); if(!L.rowCount) return res.status(404).json({error:'Invalid key'}); await pool.query('delete from license_activations where license_id=$1 and device_hash=$2',[L.rows[0].id,device_hash]); res.json({ok:true}); }
