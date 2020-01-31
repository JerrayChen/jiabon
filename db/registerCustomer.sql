insert into customer (email, username, hash)
values ($1,$2,$3)
returning *;