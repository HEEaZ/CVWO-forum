class ApplicationController < ActionController::API
    include JsonWebToken

    before_action :authenticate_request

    private
    def authenticate_request
        header = request.headers["Authorization"]
        decoded = jwt_decode(header.split(" ").last) if header
        if !decoded || !User.exists?(decoded[:user_id])
            return render json: { message: 'Unauthorized' }, status: :unauthorized
        else
            @current_user = decoded[:user_id]
        end
    end
end
