from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
import random

from API import models


class Command(BaseCommand):
    help = 'Seed the database with sample data (20 records per table)'

    def handle(self, *args, **options):
        User = get_user_model()
        created = {}

        # Users
        users = []
        for i in range(20):
            username = f'user{i+1}'
            email = f'user{i+1}@example.com'
            u, _ = User.objects.get_or_create(username=username, defaults={'email': email})
            u.set_password('password')
            u.save()
            users.append(u)
        created['users'] = len(users)

        # Administradores
        admins = []
        for i in range(20):
            a, _ = models.Administrador.objects.get_or_create(
                correo=f'admin{i+1}@example.com',
                defaults={
                    'nombre': f'Admin {i+1}',
                    'contrasena': 'secret',
                    'telefono': f'555000{i+1:03d}'
                }
            )
            admins.append(a)
        created['administradores'] = len(admins)

        # PersonalCafeteria
        cafeterias = []
        for i in range(20):
            c, _ = models.PersonalCafeteria.objects.get_or_create(
                correo=f'caf{i+1}@example.com',
                defaults={
                    'nombre': f'Personal {i+1}',
                    'contrasena': 'secret',
                }
            )
            cafeterias.append(c)
        created['personal_cafeteria'] = len(cafeterias)

        # Productos
        productos = []
        for i in range(20):
            p, _ = models.Producto.objects.get_or_create(
                nombre=f'Producto {i+1}',
                defaults={
                    'codigo': f'P{i+1:04d}',
                    'categoria': random.choice(['Bebida', 'Snack', 'Dulce', 'Salado']),
                    'precio': round(random.uniform(5, 100), 2),
                    'descripcion': f'Descripcion del producto {i+1}'
                }
            )
            productos.append(p)
        created['productos'] = len(productos)

        # Inventarios
        inventarios = []
        for i in range(20):
            prod = random.choice(productos)
            inv, _ = models.Inventario.objects.get_or_create(
                id_producto=prod,
                defaults={
                    'cantidad_actual': random.randint(0, 100),
                    'stock_minimo': random.randint(1, 10),
                    'alerta': False,
                }
            )
            inventarios.append(inv)
        created['inventarios'] = len(inventarios)

        # Movimientos
        movimientos = []
        for i in range(20):
            prod = random.choice(productos)
            tipo = random.choice(['entrada', 'salida'])
            cantidad = random.randint(1, 20)
            # choose actor: admin or cafeteria
            if random.choice([True, False]):
                actor_admin = random.choice(admins)
                actor_caf = None
            else:
                actor_admin = None
                actor_caf = random.choice(cafeterias)
            m = models.Movimiento(
                id_producto=prod,
                tipo=tipo,
                cantidad=cantidad,
                fecha=timezone.now(),
                id_admin=actor_admin,
                id_cafeteria=actor_caf,
            )
            try:
                m.save()
                movimientos.append(m)
            except Exception:
                # skip invalid entries
                continue
        created['movimientos'] = len(movimientos)

        # Ventas
        ventas = []
        for i in range(20):
            prod = random.choice(productos)
            caf = random.choice(cafeterias)
            cantidad = random.randint(1, 10)
            total = round((prod.precio or 1) * cantidad, 2)
            v = models.Venta.objects.create(
                id_cafeteria=caf,
                id_producto=prod,
                cantidad=cantidad,
                total=total,
                fecha=timezone.now(),
                nombre_cliente=f'Cliente {i+1}'
            )
            ventas.append(v)
        created['ventas'] = len(ventas)

        # Alimentos
        alimentos = []
        categorias = [choice[0] for choice in models.Alimento.Categoria.choices]
        for i in range(20):
            prod = random.choice(productos) if random.choice([True, False]) else None
            a = models.Alimento.objects.create(
                nombre=f'Alimento {i+1}',
                categoria=random.choice(categorias),
                descripcion=f'Descripcion alimento {i+1}',
                permitido=random.choice([True, False]),
                informacion_nutricional='Calorias: 100',
                id_producto=prod,
                sellos=random.randint(0, 5)
            )
            alimentos.append(a)
        created['alimentos'] = len(alimentos)

        # Recursos
        recursos = []
        tipos = ['infografia', 'video', 'consejo']
        for i in range(20):
            r = models.Recursos.objects.create(
                titulo=f'Recurso {i+1}',
                tipo=random.choice(tipos),
                descripcion=f'Descripcion recurso {i+1}'
            )
            recursos.append(r)

        # Create matching Infografia/Video/Consejo for some recursos
        for r in recursos[:7]:
            if r.tipo == 'infografia':
                models.Infografia.objects.create(id_recurso=r, imagen=f'/media/inf_{r.id_recurso}.png')
            elif r.tipo == 'video':
                models.Video.objects.create(id_recurso=r, url=f'https://youtu.be/{r.id_recurso}')
            else:
                models.Consejo.objects.create(id_recurso=r, categoria='general', texto='Consejo útil')

        created['recursos'] = len(recursos)

        # Consulta, Favorito, Calificacion, Recomendacion, Sugerencia, ProgresoActividad
        consultas = []
        favoritos = []
        calificaciones = []
        recomendaciones = []
        sugerencias = []
        progresos = []

        for i in range(20):
            user = random.choice(users)
            alimento = random.choice(alimentos)
            consultas.append(models.Consulta.objects.create(id_usuario=user, id_alimento=alimento, fecha=timezone.now()))
            favoritos.append(models.Favorito.objects.create(id_usuario=user, id_alimento=alimento))
            calificaciones.append(models.Calificacion.objects.create(id_usuario=user, id_alimento=alimento, comentario=f'Comentario {i+1}', valor=random.randint(1,5)))
            recomendaciones.append(models.Recomendacion.objects.create(id_usuario=user, id_alimento=alimento, motivo='Motivo de prueba'))
            sugerencias.append(models.Sugerencia.objects.create(id_usuario=user, texto=f'Sugerencia {i+1}', fecha=timezone.now()))
            progreso = models.ProgresoActividad.objects.create(id_usuario=user, id_recurso=random.choice(recursos), completado=random.choice([True, False]))
            progresos.append(progreso)

        created['consultas'] = len(consultas)
        created['favoritos'] = len(favoritos)
        created['calificaciones'] = len(calificaciones)
        created['recomendaciones'] = len(recomendaciones)
        created['sugerencias'] = len(sugerencias)
        created['progresos'] = len(progresos)

        # Trivia, Pregunta, IntentoEncuesta
        trivias = []
        preguntas = []
        intentos = []

        for i in range(20):
            t = models.Trivia.objects.create(titulo=f'Trivia {i+1}', descripcion='Descripcion trivia')
            trivias.append(t)

        for i in range(20):
            t = random.choice(trivias)
            p = models.Pregunta.objects.create(id_trivia=t, texto=f'Pregunta {i+1}', opcion_a='A', opcion_b='B', opcion_c='C', opcion_d='D', respuesta_correcta=random.choice(['A','B','C','D']))
            preguntas.append(p)

        for i in range(20):
            user = random.choice(users)
            t = random.choice(trivias)
            intentos.append(models.IntentoEncuesta.objects.create(id_usuario=user, id_trivia=t, fecha=timezone.now(), puntaje=random.randint(0,100)))

        created['trivias'] = len(trivias)
        created['preguntas'] = len(preguntas)
        created['intentos'] = len(intentos)

        # Ensure minimum counts (20) for all main models
        MIN = 20

        def ensure_admins():
            while models.Administrador.objects.count() < MIN:
                idx = models.Administrador.objects.count() + 1
                models.Administrador.objects.create(
                    nombre=f'Admin extra {idx}', correo=f'admin_extra{idx}@example.com', contrasena='secret', telefono=f'555100{idx:03d}'
                )

        def ensure_personal():
            while models.PersonalCafeteria.objects.count() < MIN:
                idx = models.PersonalCafeteria.objects.count() + 1
                models.PersonalCafeteria.objects.create(
                    nombre=f'Personal extra {idx}', correo=f'caf_extra{idx}@example.com', contrasena='secret'
                )

        def ensure_productos():
            while models.Producto.objects.count() < MIN:
                idx = models.Producto.objects.count() + 1
                models.Producto.objects.create(nombre=f'Producto extra {idx}', codigo=f'PX{idx:04d}', categoria='Snack', precio=9.99, descripcion='Auto generado')

        def ensure_inventarios():
            prods = list(models.Producto.objects.all())
            if not prods:
                return
            while models.Inventario.objects.count() < MIN:
                prod = random.choice(prods)
                models.Inventario.objects.create(id_producto=prod, cantidad_actual=random.randint(0,100), stock_minimo=5, alerta=False)

        def ensure_movimientos():
            prods = list(models.Producto.objects.all())
            admins_q = list(models.Administrador.objects.all())
            cefs = list(models.PersonalCafeteria.objects.all())
            if not prods or (not admins_q and not cefs):
                return
            while models.Movimiento.objects.count() < MIN:
                prod = random.choice(prods)
                cantidad = random.randint(1,10)
                if random.choice([True, False]) and admins_q:
                    m = models.Movimiento(id_producto=prod, tipo='entrada', cantidad=cantidad, fecha=timezone.now(), id_admin=random.choice(admins_q))
                else:
                    m = models.Movimiento(id_producto=prod, tipo='salida', cantidad=cantidad, fecha=timezone.now(), id_cafeteria=random.choice(cefs))
                try:
                    m.save()
                except Exception:
                    continue

        def ensure_ventas():
            prods = list(models.Producto.objects.all())
            cefs = list(models.PersonalCafeteria.objects.all())
            if not prods or not cefs:
                return
            while models.Venta.objects.count() < MIN:
                prod = random.choice(prods)
                caf = random.choice(cefs)
                cantidad = random.randint(1,5)
                total = round((prod.precio or 1) * cantidad, 2)
                models.Venta.objects.create(id_cafeteria=caf, id_producto=prod, cantidad=cantidad, total=total, fecha=timezone.now(), nombre_cliente='Cliente auto')

        def ensure_alimentos():
            productos_q = list(models.Producto.objects.all())
            categorias = [c[0] for c in models.Alimento.Categoria.choices]
            while models.Alimento.objects.count() < MIN:
                prod = random.choice(productos_q) if productos_q and random.choice([True, False]) else None
                models.Alimento.objects.create(nombre=f'Alimento extra {models.Alimento.objects.count()+1}', categoria=random.choice(categorias), descripcion='Auto', permitido=True, informacion_nutricional='Info', id_producto=prod, sellos=0)

        def ensure_recursos_and_media():
            # Ensure recursos count
            tipos = ['infografia', 'video', 'consejo']
            while models.Recursos.objects.count() < MIN:
                r = models.Recursos.objects.create(titulo=f'Recurso extra {models.Recursos.objects.count()+1}', tipo=random.choice(tipos), descripcion='Auto')
                # create matching child for each recurso
                if r.tipo == 'infografia':
                    models.Infografia.objects.create(id_recurso=r, imagen=f'/media/inf_extra_{r.id_recurso}.png')
                elif r.tipo == 'video':
                    models.Video.objects.create(id_recurso=r, url=f'https://youtu.be/{r.id_recurso}')
                else:
                    models.Consejo.objects.create(id_recurso=r, categoria='auto', texto='Consejo auto')

        def ensure_consulta_fav_cal_rec_sug_prog():
            users_q = list(User.objects.all())
            alimentos_q = list(models.Alimento.objects.all())
            recursos_q = list(models.Recursos.objects.all())
            if not users_q or not alimentos_q:
                return
            while models.Consulta.objects.count() < MIN:
                models.Consulta.objects.create(id_usuario=random.choice(users_q), id_alimento=random.choice(alimentos_q), fecha=timezone.now())
            while models.Favorito.objects.count() < MIN:
                models.Favorito.objects.create(id_usuario=random.choice(users_q), id_alimento=random.choice(alimentos_q))
            while models.Calificacion.objects.count() < MIN:
                models.Calificacion.objects.create(id_usuario=random.choice(users_q), id_alimento=random.choice(alimentos_q), comentario='Auto', valor=random.randint(1,5))
            while models.Recomendacion.objects.count() < MIN:
                models.Recomendacion.objects.create(id_usuario=random.choice(users_q), id_alimento=random.choice(alimentos_q), motivo='Auto')
            while models.Sugerencia.objects.count() < MIN:
                models.Sugerencia.objects.create(id_usuario=random.choice(users_q), texto='Sugerencia auto', fecha=timezone.now())
            # ProgresoActividad needs recursos
            if recursos_q:
                while models.ProgresoActividad.objects.count() < MIN:
                    models.ProgresoActividad.objects.create(id_usuario=random.choice(users_q), id_recurso=random.choice(recursos_q), completado=random.choice([True, False]), fecha=timezone.now())

        def ensure_trivia_qs():
            while models.Trivia.objects.count() < MIN:
                models.Trivia.objects.create(titulo=f'Trivia extra {models.Trivia.objects.count()+1}', descripcion='Auto')
            trivias_q = list(models.Trivia.objects.all())
            while models.Pregunta.objects.count() < MIN:
                t = random.choice(trivias_q)
                models.Pregunta.objects.create(id_trivia=t, texto='Pregunta auto', opcion_a='A', opcion_b='B', opcion_c='C', opcion_d='D', respuesta_correcta=random.choice(['A','B','C','D']))
            users_q = list(User.objects.all())
            while models.IntentoEncuesta.objects.count() < MIN and trivias_q and users_q:
                models.IntentoEncuesta.objects.create(id_usuario=random.choice(users_q), id_trivia=random.choice(trivias_q), fecha=timezone.now(), puntaje=random.randint(0,100))

        # Execute ensures
        ensure_admins()
        ensure_personal()
        ensure_productos()
        ensure_inventarios()
        ensure_movimientos()
        ensure_ventas()
        ensure_alimentos()
        ensure_recursos_and_media()
        ensure_consulta_fav_cal_rec_sug_prog()
        ensure_trivia_qs()

        # Add 20 additional Consejo records specifically
        added_consejos = 0
        while added_consejos < 20:
            r = models.Recursos.objects.create(titulo=f'Consejo extra recurso {rmodels_counter if (rmodels_counter := models.Recursos.objects.count()) else 1}', tipo='consejo', descripcion='Generado para consejos')
            try:
                models.Consejo.objects.create(id_recurso=r, categoria='extra', texto='Consejo adicional generado')
                added_consejos += 1
            except Exception:
                # If creation fails for any reason, delete recurso and continue
                r.delete()
                continue

        # Refresh created counts for summary
        created['administradores'] = models.Administrador.objects.count()
        created['personal_cafeteria'] = models.PersonalCafeteria.objects.count()
        created['productos'] = models.Producto.objects.count()
        created['inventarios'] = models.Inventario.objects.count()
        created['movimientos'] = models.Movimiento.objects.count()
        created['ventas'] = models.Venta.objects.count()
        created['alimentos'] = models.Alimento.objects.count()
        created['recursos'] = models.Recursos.objects.count()
        created['infografias'] = models.Infografia.objects.count()
        created['videos'] = models.Video.objects.count()
        created['consejos'] = models.Consejo.objects.count()
        created['consultas'] = models.Consulta.objects.count()
        created['favoritos'] = models.Favorito.objects.count()
        created['calificaciones'] = models.Calificacion.objects.count()
        created['recomendaciones'] = models.Recomendacion.objects.count()
        created['sugerencias'] = models.Sugerencia.objects.count()
        created['progresos'] = models.ProgresoActividad.objects.count()
        created['trivias'] = models.Trivia.objects.count()
        created['preguntas'] = models.Pregunta.objects.count()
        created['intentos'] = models.IntentoEncuesta.objects.count()

        # Summary
        self.stdout.write(self.style.SUCCESS('Seeding complete. Summary:'))
        for k, v in created.items():
            self.stdout.write(f'- {k}: {v}')
