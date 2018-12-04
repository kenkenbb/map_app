class FavoritesController < ApplicationController
    before_action :current_user
    
  def index
    @favorites = Favorite.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: { status: true, data: @favorites } }
    end
  end

  def create
    if @current_user
        @favorite = Favorite.new(params.require(:favorite).permit(:shop_id, :name, :latitude, :longitude, :url, :image_url, :address, :tel))
        if @favorite.save
          render json: { status: true, data: @favorite }
        else
          render json: { status: false }
        end
    else
        flash[:notice] = "ログインしていないため、お気に入り登録ができません"
        redirect_to("/");
    end
  end

  def destroy
    if @current_user
        @favorite = Favorite.find(params[:id])
        @favorite.destroy
        render json: { status: true, data: @favorite }
    else 
        flash[:notice] = "ログインしていないため、削除ができません"
        redirect_to("/");
    end
  end
end
