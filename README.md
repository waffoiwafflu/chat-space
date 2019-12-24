# #Chat-space設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, add_index:e-mail, unique:true|
|password|string|null: false|
|user_id|string|null: false, foreign_key: true|

### Association
has_many :messages_id
has_many :groups_users
has_many :gruops_id, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|string|null: false|

### Association
belongs_to :user_id

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|string|null: false, foreign_key: true|
|group_id|string|null: false, foreign_key: true|

### Association
gas_many :groups_id
has_many :users_id, through: :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
belongs_to :groups_id
belongs_to :users_id