class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request

    def login
        @user = User.find_by_username(params[:username])
        if @user&.authenticate(params[:password])
            token = jwt_encode(user_id: @user.id)
            render json: { token: token, user: @user.as_json(only: [:id, :username, :email]) }, status: :ok
        else
            render json: { error: 'Invalid Credentials' }, status: :unauthorized
        end
    end
end
