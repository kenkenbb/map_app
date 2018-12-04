class SessionsController < ApplicationController
  def create
    user = User.find_by(name: params[:session][:name])
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:notice] = "ログインしました"
      redirect_to mypage_path 
    else
      render login_path
    end
  end

  def destroy
    session.delete(:user_id)
    flash[:notice] = "ログアウトしました"
    redirect_to root_path
  end
end
