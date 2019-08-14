defmodule MemeBaseWeb.Authenticator do
  def authenticate(conn) do
    case Samly.get_active_assertion(conn) do
      %{attributes: attributes} ->
        {:ok, attributes}
      _ ->
        {:error, :not_logged_in}
    end
  end
end
