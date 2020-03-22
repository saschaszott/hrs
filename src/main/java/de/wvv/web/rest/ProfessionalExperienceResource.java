package de.wvv.web.rest;

import de.wvv.domain.ProfessionalExperience;
import de.wvv.repository.ProfessionalExperienceRepository;
import de.wvv.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.wvv.domain.ProfessionalExperience}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfessionalExperienceResource {

    private final Logger log = LoggerFactory.getLogger(ProfessionalExperienceResource.class);

    private static final String ENTITY_NAME = "professionalExperience";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfessionalExperienceRepository professionalExperienceRepository;

    public ProfessionalExperienceResource(ProfessionalExperienceRepository professionalExperienceRepository) {
        this.professionalExperienceRepository = professionalExperienceRepository;
    }

    /**
     * {@code POST  /professional-experiences} : Create a new professionalExperience.
     *
     * @param professionalExperience the professionalExperience to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new professionalExperience, or with status {@code 400 (Bad Request)} if the professionalExperience has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/professional-experiences")
    public ResponseEntity<ProfessionalExperience> createProfessionalExperience(@RequestBody ProfessionalExperience professionalExperience) throws URISyntaxException {
        log.debug("REST request to save ProfessionalExperience : {}", professionalExperience);
        if (professionalExperience.getId() != null) {
            throw new BadRequestAlertException("A new professionalExperience cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfessionalExperience result = professionalExperienceRepository.save(professionalExperience);
        return ResponseEntity.created(new URI("/api/professional-experiences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /professional-experiences} : Updates an existing professionalExperience.
     *
     * @param professionalExperience the professionalExperience to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated professionalExperience,
     * or with status {@code 400 (Bad Request)} if the professionalExperience is not valid,
     * or with status {@code 500 (Internal Server Error)} if the professionalExperience couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/professional-experiences")
    public ResponseEntity<ProfessionalExperience> updateProfessionalExperience(@RequestBody ProfessionalExperience professionalExperience) throws URISyntaxException {
        log.debug("REST request to update ProfessionalExperience : {}", professionalExperience);
        if (professionalExperience.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfessionalExperience result = professionalExperienceRepository.save(professionalExperience);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, professionalExperience.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /professional-experiences} : get all the professionalExperiences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of professionalExperiences in body.
     */
    @GetMapping("/professional-experiences")
    public List<ProfessionalExperience> getAllProfessionalExperiences() {
        log.debug("REST request to get all ProfessionalExperiences");
        return professionalExperienceRepository.findAll();
    }

    /**
     * {@code GET  /professional-experiences/:id} : get the "id" professionalExperience.
     *
     * @param id the id of the professionalExperience to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the professionalExperience, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/professional-experiences/{id}")
    public ResponseEntity<ProfessionalExperience> getProfessionalExperience(@PathVariable Long id) {
        log.debug("REST request to get ProfessionalExperience : {}", id);
        Optional<ProfessionalExperience> professionalExperience = professionalExperienceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(professionalExperience);
    }

    /**
     * {@code DELETE  /professional-experiences/:id} : delete the "id" professionalExperience.
     *
     * @param id the id of the professionalExperience to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/professional-experiences/{id}")
    public ResponseEntity<Void> deleteProfessionalExperience(@PathVariable Long id) {
        log.debug("REST request to delete ProfessionalExperience : {}", id);
        professionalExperienceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
