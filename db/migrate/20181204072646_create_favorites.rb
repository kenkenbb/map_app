class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.string :shop_id
      t.string :name
      t.float :latitude
      t.float :longitude
      t.string :url
      t.string :image_url
      t.string :address
      t.string :tel

      t.timestamps
    end
  end
end
