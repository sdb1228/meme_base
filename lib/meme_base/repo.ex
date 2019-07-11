defmodule MemeBase.Repo do
  use Ecto.Repo,
    otp_app: :meme_base,
    adapter: Ecto.Adapters.Postgres
end
