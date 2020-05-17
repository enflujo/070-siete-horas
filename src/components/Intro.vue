<template>
  <div id="intro">
    <h2 class="title">Siete horas de angustia en La Modelo</h2>
    <p class="mainText">
      El pasado 21 de marzo, cientos de internos de la cárcel La Modelo de Bogotá se amotinaron, reclamando atención
      ante la pandemia del Covid-19. La reacción de la guardia, apoyada por la policía y el ejército, dejó un saldo de
      24 reclusos muertos y casi un centenar de heridos, entre ellos, 11 guardias. Usando imágenes de fuentes abiertas,
      análisis visual y los testimonios de presos y guardias reconstruimos lo que ocurrió esa noche.
    </p>
    <p class="highlight center">(Atención: material explícito y sensible)</p>

    <p>¿Qué pasó exactamente la noche del motín? Aún no hay resultados de la investigación que adelanta la Fiscalía y la Procuraduría. La Ministra de Justicia, Margarita Cabello, se limitó a decir que se había tratado de "un intento masivo y criminal de fuga". El Inpec ha guardado silencio, incluso ante los familiares de quienes murieron.</p>
    <p>Para construir este reportaje recolectamos imágenes y videos que circularon en redes sociales y tuvimos acceso a relatos y documentos visuales y sonoros de internos, algunos de sus familiares y guardianes.</p>
    <p>Georeferenciamos cada video utilizando pistas de lugar (postes de luz, morfología de edificios, color y textura del suelo, etc.) y con la ayuda de personas que conocen el penal por dentro e imágenes satelitales y terrestres del sector. En algunos casos, sobre todo los que son grabados dentro de los pasillos, solo pudimos estimar el lugar aproximado.</p>
    <p>Utilizando los metadatos de los videos, ordenamos el material en una secuencia cronológica. Cuando no era posible ubicar la hora exacta, estimamos un rango, utilizando criterios como si se escuchan tiros, si se oye o se ve el helicóptero de la policía, el estado de heridos que aparecen en otras secuencias, si se ve humo o fuego, entre otros. También usamos indicios de tiempo en los audios que acompañan los videos.</p>
    <p>Marcamos los videos en los que aparecen heridos (punto naranja) y en los que aparecen muertos (punto rojo) para determinar el lugar, aproximado o exacto, en el que quedaron sus cuerpos y hacer un conteo, según la evidencia recogida. En las imágenes se pueden confirmar al menos 14 muertos, de los 23 que quedaron en el lugar, según el reporte oficial. Uno más murió en el hospital, días después.</p>
    <p>La investigación permite entender mejor lo que sucedió esa noche y cómo se desarrollaron los hechos en el tiempo. Queda claro que la mayoría de internos fueron heridos con armas de fuego, y en particular por proyectiles de fusil y pistolas; los heridos recibieron la primera atención dentro de los pabellones, donde varios murieron; un grupo grande de muertos quedó en el sector contiguo al rancho de alimentos y presenta signos de haber sido movidos o arrastrados, antes del levantamiento por parte de las autoridades judiciales. No hay evidencia de que los internos hayan atacado con armas de fuego a la guardia, aunque sí se comprueba que tuvieron acceso a un fusil.</p>

    <p>
      Si tiene material o información adicional sobre estos hechos, puede enviarlo al correo
      <span
        class="highlightText"
      >andmoral@uniandes.edu.co</span>
    </p>

    <h3>Créditos</h3>
    <p>
      <strong>Reporteros:</strong> Lorenzo Morales, Natalia Arenas, Sara Cely, David Angulo, Tomás Mantilla (CEPER).
    </p>
    <p>
      <strong>Diseño y producción multimedia:</strong> Juan Camilo González (CEPER).
    </p>
    <p>
      <strong>Agradecimientos:</strong> Grupo de Prisiones de la Universidad de los Andes, Lucas Ospina, Giancarlo
      Fiorella.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Intro'
};
</script>

<style scoped lang="scss" scoped>
@import '../scss/_variables.scss';
#intro {
  line-height: 1.5;
  margin-top: 5em;
}

.highlight {
  color: $highlightColor;
  font-size: 1.2em;
  background-color: lighten($dangerColor, 15%);
  color: black;
  padding: 0.5em;
}

.mainText {
  font-size: 1.4em;
  line-height: 1.7;
}

.highlightText {
  color: $highlightColor;
}
</style>
