update order_master set refund = true
where order_master_id = $1
returning *;