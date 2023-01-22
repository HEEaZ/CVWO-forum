class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:create]
    before_action :set_user, only: [:show, :destroy]

    def show
        render json: @user, include: :posts, status: :ok
    end
    
    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: { errors: @user.errors.full_messages },
                status: :unprocessable_entity
        end
    end

    def update
        unless @user.update(user_params)
            render json: { errors: @user.errors.full_messages },
                status: :unprocessable_entity
        end
    end

    def destroy
        if @current_user == @user.id 
            @user.destroy
        else
            render json: { error: 'Unauthorized Action' }, status: :unauthorized
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation, :name)
    end

    def set_user
        @user = User.find(params[:id])
    end

end
