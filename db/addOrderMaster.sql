insert into order_master (store_menu_id, customer_id, total_price, charge_id, refund)
values((select store_menu_id from store_dish where store_dish_id = $1), $2, $3, $4, false)
returning *;