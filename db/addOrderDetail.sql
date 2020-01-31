insert into order_detail (order_master_id, store_dish_id, order_amt) (
select $1 order_master_id
, cast (d.dishes->>'store_dish_id' as integer) store_dish_id
, cast (d.dishes->>'ordering_amt' as integer) order_amt
  from (SELECT jsonb_array_elements($2::jsonb) AS dishes) d
  where cast (d.dishes->>'ordering_amt' as integer) > 0
)
returning *;
