import PocketBase from 'pocketbase';

export default async function handler(req, res) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const record = await pb.collection('users').create(req.body);

  res.status(200).json({ data: record });
}
