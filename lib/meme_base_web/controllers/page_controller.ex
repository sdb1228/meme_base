defmodule MemeBaseWeb.PageController do
  use MemeBaseWeb, :controller

  alias MemeBaseWeb.Authenticator

  action_fallback MemeBaseWeb.FallbackController

  def index(conn, _params) do
    with {:ok, saml_junk} <- Authenticator.authenticate(conn) do
      render(conn, "index.html")
    end
  end
end
