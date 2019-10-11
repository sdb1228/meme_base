defmodule MemeBaseWeb.PageController do
  use MemeBaseWeb, :controller

  alias MemeBaseWeb.Authenticator

  action_fallback MemeBaseWeb.FallbackController

  def index(conn, _params) do
    with {:ok, _saml_junk} <- Authenticator.authenticate(conn) do
      render(conn, "index.html")
    end
  end

  alias ExAws.S3

  def upload(conn, %{"img" => upload} = _params) do
    with {:ok, _saml_junk} <- Authenticator.authenticate(conn) do
      # TODO:
      # - [ ] make sure this is an image (at least check upload.content_type)
      # - [X] generate a unique filename
      #   - [ ] generate friendlier filenames
      # - [ ] save file info to db and return identifier

      s3_path = Ecto.UUID.generate() <> Path.extname(upload.filename)

      {:ok, _response} = upload.path
      |> S3.Upload.stream_file
      |> S3.upload("memebase", s3_path)
      |> ExAws.request

      # insert into memes table
      {:ok, _} = %MemeBase.Meme{s3_path: s3_path} |> MemeBase.Repo.insert

      text conn, "OK"
    end
  end

  def health_check(conn, _params) do
    text conn, "OK"
  end
end
