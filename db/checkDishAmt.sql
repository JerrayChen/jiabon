select g.*
, (g.serve_amt-g.ordered_amt - cast (d.dishes->>'ordering_amt' as integer))>=0 available
, cast (d.dishes->>'ordering_amt' as integer) ordering_amt
from (
  select sd.*, 
  sum(COALESCE(o.order_amt,0)) ordered_amt from store_dish sd
  left join (
    select od.store_dish_id, od.order_amt from order_detail od
    inner join order_master om
    on om.order_master_id = od.order_master_id
    where om.refund = false) o
  on o.store_dish_id = sd.store_dish_id
  group by sd.store_dish_id
) g
inner join (SELECT jsonb_array_elements($1::jsonb) AS dishes ) d
on cast (d.dishes->>'store_dish_id' as integer) = g.store_dish_id
