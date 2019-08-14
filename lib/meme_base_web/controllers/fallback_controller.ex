defmodule MemeBaseWeb.FallbackController do
  use Phoenix.Controller

  def call(conn, {:error, :not_logged_in}) do
    conn
    |> redirect(to: "/sso/auth/signin/okta")
    |> halt()
  end
end
