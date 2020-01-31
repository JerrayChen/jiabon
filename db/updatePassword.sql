update customer set hash = $1
where customer_id = $2;
select * from customer
where customer_id = $2;