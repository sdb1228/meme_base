defmodule MemeBaseWeb.PageController do
  use MemeBaseWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
