set -eu

mix phx.digest
mix ecto.setup
mix phx.server
