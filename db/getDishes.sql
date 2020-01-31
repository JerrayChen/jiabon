select s.name store_name, sm.reserve_time, sm.pick_up_time, g.*, (g.serve_amt-g.ordered_amt) left_amt, 0 ordering_amt 
from (
    -- select sd.*, 
    -- sum(COALESCE(od.order_amt,0)) ordered_amt from store_dish sd
    -- left join order_detail od
    -- on od.store_dish_id = sd.store_dish_id
    -- where store_menu_id = $1
    -- group by sd.store_dish_id
    select sd.*, 
    sum(COALESCE(o.order_amt,0)) ordered_amt from store_dish sd
    left join (
    select od.store_dish_id, od.order_amt from order_detail od
    inner join order_master om
    on om.order_master_id = od.order_master_id
    where om.refund = false) o
    on o.store_dish_id = sd.store_dish_id
    where store_menu_id = $1
    group by sd.store_dish_id
) g
inner join store_menu sm
on sm.store_menu_id = g.store_menu_id
inner join store s
on sm.store_id = s.store_id