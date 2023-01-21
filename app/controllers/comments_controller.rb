class CommentsController < ApplicationController
    before_action :set_comment, only: %i[ update destroy ]

  # POST /posts
  def create
    @comment = Comment.new(comment_params)

    if @pcomment.save
    #   render json: @post, status: :created, location: @post
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @comment.update(cp,,emt_params)
    #   render json: @post
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:comment).permit(:body, :user_id, :post_id)
    end
end
