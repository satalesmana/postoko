interface QueryFilter {
  filter: any;
  limit: number;
  skiped: number;
}
export async function getQueryMongodb(
  collection: any,
  filter: QueryFilter | null
) {
  const limit = filter?.limit || 10;
  const skiped = filter?.skiped || 0;
  const filterData = filter?.filter || {};

  const data = await collection.find(filterData).skip(skiped).limit(limit);
  const total = await collection.countDocuments(filterData);
  const total_page = total == 0 ? 0 : (parseInt(total) - 1) / (limit + 1);

  return {
    data: data || [],
    meta: {
      total_data: total || 0,
      per_page: limit as number,
      current_page: 1,
      total_page: Math.ceil(total_page),
    },
  };
}
