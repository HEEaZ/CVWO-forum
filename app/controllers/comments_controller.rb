class CommentsController < ApplicationController
    before_action :get_post
    before_action :set_comment, only: %i[ update destroy ]

  def create
    @comment = @post.comments.create(comment_params)
    @comment.user_id = @current_user

    if @comment.save
        @post = Post.find(@comment.post_id)
      render json: @post, include: :comments , status: :created, location: @post
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
        render json: @post, include: :comments
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
  end

  private
    def get_post
        @post = Post.find(params[:post_id])
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = @post.comments.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:body)
    end
end
