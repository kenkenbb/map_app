# == Schema Information
#
# Table name: favorites
#
#  id         :bigint(8)        not null, primary key
#  address    :string
#  image_url  :string
#  latitude   :float
#  longitude  :float
#  name       :string
#  tel        :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  shop_id    :string
#

require 'test_helper'

class FavoriteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
