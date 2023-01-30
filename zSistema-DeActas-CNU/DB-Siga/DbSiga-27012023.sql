USE [SIGA-CNU]
GO
/****** Object:  Schema [Auditorias]    Script Date: 27/01/2023 17:02:34 ******/
CREATE SCHEMA [Auditorias]
GO
/****** Object:  Schema [Catalogos]    Script Date: 27/01/2023 17:02:34 ******/
CREATE SCHEMA [Catalogos]
GO
/****** Object:  Schema [Estadisticas]    Script Date: 27/01/2023 17:02:34 ******/
CREATE SCHEMA [Estadisticas]
GO
/****** Object:  Schema [Legales]    Script Date: 27/01/2023 17:02:34 ******/
CREATE SCHEMA [Legales]
GO
/****** Object:  Schema [RRHH]    Script Date: 27/01/2023 17:02:34 ******/
CREATE SCHEMA [RRHH]
GO
/****** Object:  Schema [Seguridad]    Script Date: 27/01/2023 17:02:34 ******/
CREATE SCHEMA [Seguridad]
GO
/****** Object:  Table [Catalogos].[Cargo]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Catalogos].[Cargo](
	[CodCargo] [int] NOT NULL,
	[Cargo] [nchar](10) NULL,
	[CodTipo] [nchar](10) NULL,
 CONSTRAINT [PK_Cargo] PRIMARY KEY CLUSTERED 
(
	[CodCargo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Estadisticas].[Cumplimiento]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Estadisticas].[Cumplimiento](
	[CodCumplimiento] [int] NOT NULL,
	[CodActa] [int] NOT NULL,
	[CodFuncionario] [int] NULL,
	[IdCumplimiento] [nvarchar](max) NULL,
	[FechaCumplimiento] [date] NULL,
	[Observacion] [nvarchar](max) NULL,
	[EstadoCumplimiento] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Cumplimiento] PRIMARY KEY CLUSTERED 
(
	[CodCumplimiento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [CodActaUnica] UNIQUE NONCLUSTERED 
(
	[CodActa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Estadisticas].[CumplimientoDetalle]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Estadisticas].[CumplimientoDetalle](
	[CodCumplimientoDetalle] [int] NOT NULL,
	[CodCumplimiento] [int] NOT NULL,
	[CodAcuerdo] [int] NULL,
	[CodAgenda] [int] NULL,
	[CodResolucion] [int] NULL,
	[Observacion] [nvarchar](max) NULL,
	[EstadoDelAcuerdo] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_CumplimientoDetalle_1] PRIMARY KEY CLUSTERED 
(
	[CodCumplimientoDetalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Legales].[Actas]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Actas](
	[CodActas] [int] IDENTITY(1,1) NOT NULL,
	[CodAgenda] [int] NULL,
	[CodSesion] [int] NULL,
	[CodMiembro] [int] NULL,
	[IdActaMembrete] [nvarchar](max) NULL,
	[ActaDescripcion] [nvarchar](max) NULL,
	[EstadoActaX100] [float] NULL,
	[Observacion] [nvarchar](max) NULL,
	[EstadoActa] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Actas] PRIMARY KEY CLUSTERED 
(
	[CodActas] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Legales].[Acuerdos]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Acuerdos](
	[CodAcuerdo] [int] IDENTITY(1,1) NOT NULL,
	[CodActa] [int] NULL,
	[CodAgendaDetalles] [int] NULL,
	[IdAcuerdos] [int] NULL,
	[Acuerdos] [nvarchar](max) NULL,
	[EstadoAcuerdo] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Acuerdos] PRIMARY KEY CLUSTERED 
(
	[CodAcuerdo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Legales].[AgendaDetalles]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[AgendaDetalles](
	[CodAgendaDetalles] [int] IDENTITY(1,1) NOT NULL,
	[CodAgenda] [int] NULL,
	[PuntosAgenda] [nvarchar](max) NULL,
	[EstadoPunto] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_AgendaDetalles] PRIMARY KEY CLUSTERED 
(
	[CodAgendaDetalles] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Legales].[Agendas]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Agendas](
	[CodAgenda] [int] IDENTITY(1,1) NOT NULL,
	[IdAgenda] [nvarchar](max) NULL,
	[TemaDeAgenda] [nvarchar](max) NULL,
	[EstadoAgenda] [int] NULL,
	[FechaRegristro] [date] NULL,
	[EstadoRegsistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Agendas] PRIMARY KEY CLUSTERED 
(
	[CodAgenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Legales].[Resoluciones]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Resoluciones](
	[CodResolucion] [int] IDENTITY(1,1) NOT NULL,
	[CodAcuerdo] [int] NULL,
	[IdReSolucion] [nvarchar](max) NULL,
	[ReSolucion] [nvarchar](max) NULL,
	[EstadoResolucion] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Resoluciones] PRIMARY KEY CLUSTERED 
(
	[CodResolucion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [CodAcuerdoUnico] UNIQUE NONCLUSTERED 
(
	[CodAcuerdo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [RRHH].[Miembros]    Script Date: 27/01/2023 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [RRHH].[Miembros](
	[CodMiembro] [int] NOT NULL,
	[CodCargo] [int] NULL,
	[CodProcedencia] [int] NULL,
	[Grado] [nchar](20) NULL,
	[IdMiembro] [nvarchar](max) NULL,
	[pNombre] [nvarchar](max) NULL,
	[sNombre] [nvarchar](max) NULL,
	[pApellido] [nvarchar](max) NULL,
	[sApellido] [nvarchar](max) NULL,
 CONSTRAINT [PK_Miembros_1] PRIMARY KEY CLUSTERED 
(
	[CodMiembro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Catalogos].[Cargo] ADD  CONSTRAINT [DF_Cargo_IdCargo]  DEFAULT ((0)) FOR [CodCargo]
GO
ALTER TABLE [RRHH].[Miembros] ADD  CONSTRAINT [DF_Miembros_CodMiembro]  DEFAULT ((0)) FOR [CodMiembro]
GO
ALTER TABLE [Estadisticas].[Cumplimiento]  WITH CHECK ADD  CONSTRAINT [FK_Cumplimiento_Actas] FOREIGN KEY([CodActa])
REFERENCES [Legales].[Actas] ([CodActas])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Estadisticas].[Cumplimiento] CHECK CONSTRAINT [FK_Cumplimiento_Actas]
GO
ALTER TABLE [Estadisticas].[CumplimientoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CumplimientoDetalle_Cumplimiento] FOREIGN KEY([CodCumplimiento])
REFERENCES [Estadisticas].[Cumplimiento] ([CodCumplimiento])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Estadisticas].[CumplimientoDetalle] CHECK CONSTRAINT [FK_CumplimientoDetalle_Cumplimiento]
GO
ALTER TABLE [Legales].[Actas]  WITH CHECK ADD  CONSTRAINT [FK_Actas_Miembros] FOREIGN KEY([CodMiembro])
REFERENCES [RRHH].[Miembros] ([CodMiembro])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[Actas] CHECK CONSTRAINT [FK_Actas_Miembros]
GO
ALTER TABLE [Legales].[Acuerdos]  WITH CHECK ADD  CONSTRAINT [FK_Acuerdos_Actas] FOREIGN KEY([CodActa])
REFERENCES [Legales].[Actas] ([CodActas])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[Acuerdos] CHECK CONSTRAINT [FK_Acuerdos_Actas]
GO
ALTER TABLE [Legales].[Acuerdos]  WITH CHECK ADD  CONSTRAINT [FK_Acuerdos_AgendaDetalles] FOREIGN KEY([CodAgendaDetalles])
REFERENCES [Legales].[AgendaDetalles] ([CodAgendaDetalles])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[Acuerdos] CHECK CONSTRAINT [FK_Acuerdos_AgendaDetalles]
GO
ALTER TABLE [Legales].[AgendaDetalles]  WITH CHECK ADD  CONSTRAINT [FK_AgendaDetalles_Agendas] FOREIGN KEY([CodAgenda])
REFERENCES [Legales].[Agendas] ([CodAgenda])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[AgendaDetalles] CHECK CONSTRAINT [FK_AgendaDetalles_Agendas]
GO
ALTER TABLE [Legales].[Resoluciones]  WITH CHECK ADD  CONSTRAINT [FK_Resoluciones_Acuerdos] FOREIGN KEY([CodAcuerdo])
REFERENCES [Legales].[Acuerdos] ([CodAcuerdo])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[Resoluciones] CHECK CONSTRAINT [FK_Resoluciones_Acuerdos]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'id del cargo' , @level0type=N'SCHEMA',@level0name=N'Catalogos', @level1type=N'TABLE',@level1name=N'Cargo', @level2type=N'COLUMN',@level2name=N'CodCargo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'"Id de miembros"' , @level0type=N'SCHEMA',@level0name=N'RRHH', @level1type=N'TABLE',@level1name=N'Miembros', @level2type=N'COLUMN',@level2name=N'CodMiembro'
GO
