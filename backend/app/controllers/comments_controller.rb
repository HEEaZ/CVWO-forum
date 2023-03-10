class CommentsController < ApplicationController
    before_action :get_post
    before_action :set_comment, only: %i[ update destroy ]

  def create
    @comment = @post.comments.create(comment_params)
    @comment.user_id = @current_user[:user_id]

    if @comment.save
        @post = Post.find(@comment.post_id)
      render json: @post, include: :comments, status: :created, location: @post
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.user_id != @current_user[:user_id]
      render json: { error: 'Unauthorized Action' }, status: :unauthorized
    elsif @comment.update(comment_params)
        render json: @post, include: :comments
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @comment.user_id == @current_user[:user_id]
      @comment.destroy
    else
      render json: { error: 'Unauthorized Action' }, status: :unauthorized
    end
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
