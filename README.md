# Chat-space設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, add_index:e-mail, unique:true|
|password|string|null: false|
|name|string|null: false,add_index:name, unique:true|

### Association
has_many :messages
has_many :groups_users
has_many :gruops, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|img|string|
|body|text|
|groups_id|integer|
|user_id|integer|

### Association
belongs_to :user
belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
has_many :groups_users
has_many :messages
has_many :users, through: :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|integer|null: false, foreign_key: true|
|group|integer|null: false, foreign_key: true|

### Association
belongs_to :group
belongs_to :user