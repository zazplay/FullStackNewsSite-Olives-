# См. статью по ссылке https://aka.ms/customizecontainer, чтобы узнать как настроить контейнер отладки и как Visual Studio использует этот Dockerfile для создания образов для ускорения отладки.

# Этот этап используется при запуске из VS в быстром режиме (по умолчанию для конфигурации отладки)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Этот этап используется для сборки проекта службы
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["olivefullstack.client/nuget.config", "olivefullstack.client/"]
COPY ["OliveFullStack.Server/OliveFullStack.Server.csproj", "OliveFullStack.Server/"]
COPY ["olivefullstack.client/olivefullstack.client.esproj", "olivefullstack.client/"]
COPY ["Ovile_BLL_Layer/Ovile_BLL_Layer.csproj", "Ovile_BLL_Layer/"]
COPY ["Ovile_DAL_Layer/Ovile_DAL_Layer.csproj", "Ovile_DAL_Layer/"]
RUN dotnet restore "./OliveFullStack.Server/OliveFullStack.Server.csproj"
COPY . .
WORKDIR "/src/OliveFullStack.Server"
RUN dotnet build "./OliveFullStack.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этот этап используется для публикации проекта службы, который будет скопирован на последний этап
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./OliveFullStack.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Этот этап используется в рабочей среде или при запуске из VS в обычном режиме (по умолчанию, когда конфигурация отладки не используется)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OliveFullStack.Server.dll"]