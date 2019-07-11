defmodule MemeBase.Repo.Migrations.CreateMemes do
  use Ecto.Migration

  def change do
    create table(:memes) do
      add :url, :string
    end
  end
end
