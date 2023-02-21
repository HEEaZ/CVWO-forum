class PostsController < ApplicationController
  skip_before_action :authenticate_request, only: [:index, :show]
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.order(created_at: :desc)
    render json: @posts.to_json(
      include: {
        user: {only: :username},
      }), status: :ok
  end

  # GET /posts/1
  def show
    render json: @post.to_json(
      include: {
        comments: {
          include: {
            user: {
              only: :username
            }
          },
          except: [:post_id],
        },
        user: {
          only: :username
        }
      }
    )
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.user_id = @current_user

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.user_id != @current_user
      render json: { error: 'Unauthorized Action' }, status: :unauthorized
    elsif @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    if @post.user_id == @current_user
      @post.destroy
    else
      render json: { error: 'Unauthorized Action' }, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body)
    end
end
