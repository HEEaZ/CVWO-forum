class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request, only: [:login]

    def login
        @user = User.find_by_username(params[:username])
        if @user&.authenticate(params[:password])
            token = jwt_encode(user_id: @user.id, user_username: @user.username, user_email: @user.email)
            render json: { token: token, user: @user.as_json(only: [:id, :username, :email]) }, status: :ok
        else
            render json: { error: 'Invalid Credentials' }, status: :unauthorized
        end
    end

    def checkLogin
        render json: @current_user, status: :ok
    end
end
