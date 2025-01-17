// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Utiliser des TTL (Time To Live) pour les clés, invalider le cache lorsque les données changent, et structurer les clés de manière logique.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des noms de clés descriptifs et cohérents, éviter les clés trop longues, et utiliser des namespaces pour organiser les clés.

const redis = require("redis");
const RedisInsight = require("redis-insight");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const redisInsight = new RedisInsight({
  host: process.env.REDIS_INSIGHT_HOST,
  port: process.env.REDIS_INSIGHT_PORT,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
  redisInsight.connect();
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  try {
    await redisClient.set(key, JSON.stringify(data), "EX", ttl);
    console.log(`Données mises en cache avec la clé: ${key}`);
  } catch (error) {
    console.error("Erreur lors de la mise en cache des données:", error);
  }
}

async function getCachedData(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données en cache:",
      error
    );
    return null;
  }
}

module.exports = {
  cacheData,
  getCachedData,
};
