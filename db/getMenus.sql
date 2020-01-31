select s.name, sm.* from store_menu sm
inner join store s
on s.store_id = sm.store_id
where sm.store_id = $1
order by sm.pick_up_time asc;