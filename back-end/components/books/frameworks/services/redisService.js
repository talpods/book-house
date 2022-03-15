import redis from "redis";

export const redisService = async (key, cb) => {
  const client = await redis.createClient({
    url: process.env.REDIS_URL,
  });
  client.on("error", (err) => {
    console.log("Redis Client Error", err);
  });

  await client.connect();
  const data = await client.get(key);
  if (data === null) {
    console.log("cache Miss");
    const newData = await cb();
    client.setEx(key, process.env.REDIS_EX, JSON.stringify(newData));
    return newData;
  } else {
    console.log("cache Hit");
    return JSON.parse(data);
  }
};

export const redisFlush = async () => {
  const client = await redis.createClient({
    url: process.env.REDIS_URL,
  });
  client.on("error", (err) => {
    console.log("Redis Client Error", err);
  });

  await client.connect();
  await client.flushAll();
};
