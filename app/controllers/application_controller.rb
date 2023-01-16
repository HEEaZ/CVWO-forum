class ApplicationController < ActionController::API
    include JsonWebToken

    before_action :authenticate_request

    private
    def authenticate_request
        header = request.headers["Authorization"]
        decoded = jwt_decode(header.split(" ").last) if header
        return render json: { message: 'Unauthorized' }, status: :unauthorized unless decoded
        @current_user = decoded[:user_id]
    end
end
