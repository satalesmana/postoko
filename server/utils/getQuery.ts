interface QueryFilter {
  filter: any;
  limit: number;
  skiped: number;
}
export async function getQuery(collection: any, filter: QueryFilter) {
  const limit = filter?.limit || 10;
  const skiped = filter?.skiped || 0;
  const filterData = filter?.filter || {};

  const data = await collection.find(filterData).skip(skiped).limit(limit);
  const total = await collection.countDocuments(filterData);

  return { data: data, total, per_page: limit };
}
