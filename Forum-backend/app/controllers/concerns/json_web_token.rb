require "jwt"
TIMEOUT = 6.hour.from_now

module JsonWebToken
    extend ActiveSupport::Concern
    SECRET_KEY = Rails.application.secret_key_base

    def jwt_encode(payload, exp = TIMEOUT)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET_KEY)
    end
    
    def jwt_decode(token)
        begin
            decoded = JWT.decode(token, SECRET_KEY)[0]
            HashWithIndifferentAccess.new decoded
        rescue JWT::DecodeError
            return false
        end

    end
end
        