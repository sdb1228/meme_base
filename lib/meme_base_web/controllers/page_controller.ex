defmodule MemeBaseWeb.PageController do
  use MemeBaseWeb, :controller

  alias MemeBaseWeb.Authenticator

  action_fallback MemeBaseWeb.FallbackController

  def index(conn, _params) do
    with {:ok, saml_junk} <- Authenticator.authenticate(conn) do
      render(conn, "index.html")
    end
  end

  def upload(conn, %{"img" => upload} = _params) do
    with {:ok, _saml_junk} <- Authenticator.authenticate(conn) do
      # TODO:
      # - make sure this is an image (at least check upload.content_type)
      # - generate a unique filename
      # - put this somewhere real
      # - save file info to db and return identifier
      File.cp upload.path, "/tmp/#{upload.filename}"
      text conn, "OK"
    end
  end
end
