select c.customer_id, om.*, od.*, s.name, sm.pick_up_time, sd.dish_name
from order_master om
inner join order_detail od
on om.order_master_id = od.order_master_id
inner join store_dish sd
on sd.store_dish_id = od.store_dish_id
inner join store_menu sm
on sm.store_menu_id = sd.store_menu_id
inner join store s
on s.store_id = sm.store_id
inner join customer c
on c.customer_id = om.customer_id
where om.order_master_id = $1